import http from '@/helpers/http-helper';

class SchedulerAppointmentService {
  getSalaryItems(userId, from, to) {
    return http.get(`/appointments/${userId}/salary?from=${from}&to=${to}`);
  }
}

export default new SchedulerAppointmentService();
