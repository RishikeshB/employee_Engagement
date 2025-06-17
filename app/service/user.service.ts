import { apiService } from '@/service/commonService';

export const userService = {
  async getUser(phoneNumber: string, password: string) {
    const user = await apiService.post('login',{phoneNumber, password})
    return user;
  },
  async createUser(userDetails: any) {
    const user = await apiService.post('user', userDetails);
    return user;
  },
  async resetPassword(userDetails:any) {
    const user = await apiService.post('reset-password',userDetails)
    return user;
  }
}
