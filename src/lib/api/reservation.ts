import axios from '.'

type MakeReservationAPIBody = {
  userId: string
  checkInDate: string
  checkOutDate: string
  adultCount: number
  childrenCount: number
  infantsCount: number
  roomId: string
}

// 숙소 예약하기
export const makeReservationAPI = (body: MakeReservationAPIBody) =>
  axios.post('/api/reservations', body)
