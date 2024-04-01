import axios from 'axios'
import useRoute from '@/hooks/useRoute.ts'

const checkLogin = async () => {

  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${useRoute.BackEnd}/token`,{ params: { token } })

    if (response.data.status === 200) {
      return true
    }
  } catch (error) {
    return false
  }

  return false

}

export default checkLogin