import React, { forwardRef, useContext } from 'react';

import { useVideoTexture } from '@react-three/drei';
import { mainContext } from '@/providers/MainProvider';

const Coub = forwardRef((_, ref) => {
  const { loadedMedia } = useContext(mainContext);

  console.log('loadedMedia', loadedMedia);

  const material_slide_1 = useVideoTexture(
    loadedMedia?.['/video/404/404_side_01.mp4']
  );
  const material_slide_2 = useVideoTexture(
    loadedMedia?.['/video/404/404_side_02.mp4']
  );

  console.log('material_slide_1', material_slide_1);

  // const material_slide_1 = useVideoTexture('/video/404/404_side_01.mp4');
  // const material_slide_2 = useVideoTexture('/video/404/404_side_02.mp4');

  return (
    <mesh
      ref={ref}
      position={[0, 0.1, 0]}
      rotation={[0, Math.PI * 2 + Math.PI / 2, 0]}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial attach={'material-0'} map={material_slide_1} />
      <meshBasicMaterial attach={'material-4'} map={material_slide_2} />
      <meshBasicMaterial attach={'material-1'} map={material_slide_1} />
      <meshBasicMaterial attach={'material-2'} color={'#000000'} />
      <meshBasicMaterial attach={'material-3'} color={'#000000'} />
      <meshBasicMaterial attach={'material-5'} map={material_slide_2} />
    </mesh>
  );
});

Coub.displayName = 'Coub';

export default Coub;
