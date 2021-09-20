import { readFileSync, writeFileSync } from 'fs'
import { StoredRoomType } from '../../../types/room'

// 숙소 리스트 데이터 불러오기
const getList = () => {
  const roomsBuffer = readFileSync('src/data/rooms.json')
  const roomsString = roomsBuffer.toString()
  if (!roomsString) {
    return []
  } else {
    const rooms: StoredRoomType[] = JSON.parse(roomsString)
    return rooms
  }
}

// id의 숙소 존재 확인
const exist = (roomId: number) => {
  const rooms = getList()
  return rooms.some((room) => room.id === roomId)
}

// id의 숙소 불러오기
const find = (roomId: number) => {
  const rooms = getList()
  return rooms.some((room) => room.id === roomId)
}

// 숙소 리스트 저장하기
const write = (rooms: StoredRoomType[]) => {
  console.log('const write = (rooms: StoredRoomType[]) => {')
  writeFileSync('src/data/rooms.json', JSON.stringify(rooms))
}

export { getList, exist, write, find }
