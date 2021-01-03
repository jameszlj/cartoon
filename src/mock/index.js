// 引入ANGLE_instanced_arrays
import Mock from 'mockjs'
import mock_data from './mock_data'

// 请求地址，请求方法（post/get）,require(请求数据地址)
Mock.mock('/test/search', 'get', require('./data/search.json'))
Mock.mock('/test/getInfo', 'get', mock_data.getCateInfo)
