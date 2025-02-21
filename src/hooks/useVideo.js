import { mainContext } from '@/providers/MainProvider';
import { useContext, useEffect, useMemo, useState } from 'react';

let prevSummary = [];

const useVideo = ({ list }) => {
  const [summary, setSummary] = useState(
    list.map((src) => ({
      src,
      progress: 0,
    }))
  );
  const { setLoadedVideos } = useContext(mainContext);

  const progress = useMemo(
    () =>
      Number(
        (
          summary.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.progress,
            0
          ) / list.length
        )?.toFixed(0)
      ),
    [list, summary]
  );

  useEffect(() => {
    // If list is empty, return
    if (!list || list.length === 0) return;

    prevSummary = list.map((src) => ({
      src,
      progress: 0,
    }));

    // Abort controllers
    const abortControllers = [];
    (async () => {
      // eslint-disable-next-line no-undef
      const responses = await Promise.all(
        list.map((src) => {
          const controller = new AbortController();
          abortControllers.push(controller);
          return fetch(src, { signal: controller.signal });
        })
      );

      // Process responses
      // eslint-disable-next-line no-undef
      const videos = await Promise.all(
        responses.map(async (response) => {
          // Get src from response
          const src = response.url.slice(response.url.indexOf('/video'));

          // Get content length
          const contentLength = response.headers.get('Content-Length');
          const total = parseInt(contentLength, 10) || 0;
          if (!total) {
            console.warn(
              'Content-Length not available. Progress may not be accurate.'
            );
          }

          let loaded = 0;
          const reader = response.body.getReader();
          const stream = new ReadableStream({
            start(controller) {
              async function push() {
                const { done, value } = await reader.read();
                try {
                  if (done) {
                    controller.close();
                    return;
                  }

                  loaded += value.length;
                  const result = total
                    ? Number(((loaded / total) * 100).toFixed(0))
                    : 0;

                  const prevResult = prevSummary.find(
                    (item) => item.src === src
                  ).progress;

                  if (prevResult !== result) {
                    setSummary((prev) =>
                      prev.map((item) =>
                        item.src === src ? { ...item, progress: result } : item
                      )
                    );
                    prevSummary = prevSummary.map((item) =>
                      item.src === src ? { ...item, progress: result } : item
                    );
                  }

                  controller.enqueue(value);
                  push();
                } catch (err) {
                  console.error('Stream error:', err);
                  controller.error(err);
                }
              }
              push();
            },
          });

          const videoBlob = await new Response(stream).blob();
          return {
            src,
            blobSrc: URL.createObjectURL(videoBlob),
          };
        })
      );

      const videoData = {};
      videos.forEach(({ src, blobSrc }) => {
        videoData[src] = blobSrc;
      });
      setLoadedVideos(videoData);
    })();

    // Cleanup controllers
    return () => {
      abortControllers.forEach((controller) => controller.abort());
    };
  }, [list, setLoadedVideos]);

  return {
    progress,
  };
};

export default useVideo;
