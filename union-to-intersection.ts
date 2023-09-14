/*
https://fettblog.eu/typescript-union-to-intersection/
*/
type Format320 = { urls: { format320p: string } }
type Format480 = { urls: { format480p: string } }
type Format720 = { urls: { format720p: string } }
type Format1080 = { urls: { format1080p: string } }

type BasicVideoData = {}

type Video = BasicVideoData & (
  Format320 | Format480 | Format720 | Format1080
)


type UnionToIntersection<T> = 
  (T extends any ? (x: T) => any : never) extends 
  (x: infer R) => any ? R : never

type FormatKeys = keyof UnionToIntersection<Video["urls"]>

