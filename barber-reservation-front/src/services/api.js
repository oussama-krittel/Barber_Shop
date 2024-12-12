import http from "./httpService";
import { apiUrl } from "../config";
import { getJwt } from "./user";

const apiEndpoint = `${apiUrl}/appointments`;

export function getBusyPeriods(dateTime) {
  return http.get(`${apiEndpoint}/busy-periods`, {
    params: { dateTime },
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
}

export function reserveAppointment(userId, barberId, dateTime) {
  return http.post(
    `${apiEndpoint}/reserve`,
    { userId, barberId, dateTime },
    {
      headers: { Authorization: `Bearer ${getJwt()}` },
    }
  );
}

export function cancelAppointment(appointmentId) {
  return http.delete(`${apiEndpoint}/${appointmentId}/cancel`, {
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
}

export function getUserAppointments(userId) {
  return http.get(`${apiEndpoint}/user/${userId}`, {
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
}
