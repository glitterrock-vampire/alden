import { useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';

/**
 * useAldenModel
 * Tries to load a .glb from /models/<name>.glb
 * Returns { scene, nodes, materials, ready, error }
 * If the file doesn't exist or fails, error is set and ready is false —
 * the calling component can then render its procedural fallback.
 *
 * Usage:
 *   const { scene, ready } = useAldenModel('tractor');
 *   if (!ready) return <ProceduralTractor />;
 *   return <primitive object={scene} />;
 */
export function useAldenModel(name) {
  const path = `/models/${name}.glb`;
  const [exists, setExists] = useState(null); // null = checking, true/false = result

  useEffect(() => {
    // HEAD request to check if the file is actually there
    fetch(path, { method: 'HEAD' })
      .then(r => setExists(r.ok))
      .catch(() => setExists(false));
  }, [path]);

  return exists;
}

/**
 * Pre-declared list of all model paths so useGLTF.preload can be called
 * at module level. Call preloadAldenModels() once in your app entry point
 * after you've confirmed the .glb files are in /public/models/.
 */
export const MODEL_PATHS = {
  tractor:  '/models/tractor.glb',
  barn:     '/models/barn.glb',
  farmer:   '/models/farmer.glb',
  crane:    '/models/crane.glb',
  building: '/models/building.glb',
  builder:  '/models/builder.glb',
  tree:     '/models/tree.glb',
};

export function preloadAldenModels(...names) {
  names.forEach(name => {
    if (MODEL_PATHS[name]) useGLTF.preload(MODEL_PATHS[name]);
  });
}
