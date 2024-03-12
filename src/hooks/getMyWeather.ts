// 获取当前天气

import axios from "axios"
import { ref } from "vue"

// 金华市婺城区
const cityCode: string = '330700'

// 高德地图 api
const api: string = `https://restapi.amap.com/v3/weather/weatherInfo?key=91fbfbf7ae5b8b86a33cfa66823a6f07&city=${cityCode}`

export default () => {
  const weatherInfo = ref()

  const getWeatherInfo = async () => {
    try {
      const response = await axios.get(api)
      const infos = response.data.lives[0]
      weatherInfo.value = `${infos.city} ${infos.weather} 气温: ${infos.temperature_float} ℃`
    } catch (err) {
      weatherInfo.value = "获取天气失败"
    }
  }

  return {
    weatherInfo,
    getWeatherInfo
  }
}