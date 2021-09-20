import { NextApiResponse, NextApiRequest } from 'next'
import isEmpty from 'lodash/isEmpty'
import { Reservation } from '../../../lib/data'
import { StoredReservation } from '../../../../types/reservation'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // 숙소 등록 하기
    try {
      const {
        userId,
        checkInDate,
        checkOutDate,
        adultCount,
        childrenCount,
        infantsCount,
      } = req.body
      if (
        !userId ||
        !checkInDate ||
        !checkOutDate ||
        adultCount === undefined ||
        childrenCount === undefined ||
        infantsCount === undefined
      ) {
        res.statusCode = 400
        return res.send('필수값이 없습니다.')
      }

      const reservations = Reservation.getList()
      if (isEmpty(reservations)) {
        const reservation: StoredReservation = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        Reservation.write([reservation])
        res.statusCode = 201
        return res.end()
      }

      const reservation = {
        id: reservations[reservations.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      Reservation.write([...reservations, reservation])
      res.statusCode = 201
      return res.end()
    } catch (e) {
      console.log(e)
      return res.send(e.message)
    }
  }
  res.statusCode = 405

  return res.end()
}
