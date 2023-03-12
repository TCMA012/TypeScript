/*
21. Understand Type Widening

needs to decide on a set of possible values from the single value that you specified

when you write 
as const
 after a value, TS will infer the narrowest possible type for it
*/
{
interface Vector3 { x: number; y: number; z: number; }
function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
  return vector[axis];
}
const a1 = [1, 2, 3];  // Type is number[]
const a2 = [1, 2, 3] as const;  // Type is readonly [1, 2, 3]
}