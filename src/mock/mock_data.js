import Mock from 'mockjs'
const Random = Mock.Random

export default {
  getCateInfo: req => {
    // 最佳实践，将请求和参数都打印出来，以便调试A
    let item = JSON.parse(req.body)
    console.log(item)
    let page = item.page
    let limit = item.limit
    let url = 'http://www.acmanhua.com/img/thumb/5dee1fc4521d9689.jpg'
    let articles = []
    let start = (page-1)*limit
    let end = (page-1)*limit+limit
    for (let i = 0; i < 40; i++) {
      let newArticleObject = {
        title: item.category + '_' + Random.csentence(5, 30), // Random.csentence( min, max )
        thumbnail_pic_s: url, // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
        date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      }
      articles.push(newArticleObject)
    }
    return {
      result: 0,
      data: {
        datalist: articles.slice(start,end),
        total:articles.length
      }
    }
  }
}
