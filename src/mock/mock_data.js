import Mock from 'mockjs'
const Random = Mock.Random


function get_infos() {
  let url = 'https://www.biquge.com.cn/files/article/image/44/44889/44889s.jpg'
  let articles = []
  for (let i = 0; i < 40; i++) {
    let newArticleObject = {
      book_id:12,
      title: Random.csentence(5, 30), // Random.csentence( min, max )
      url: url, // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      summry:Random.csentence(30, 200)
    }
    articles.push(newArticleObject)
  }
  return articles
}

var articles = get_infos()
console.log(articles)
export default {
  getCateInfo: req => {
    
    // 最佳实践，将请求和参数都打印出来，以便调试A
    let item = JSON.parse(req.body) 
    let page = item.page
    let size = item.size
    
    
    let start = (page-1)*size
    let end = (page-1)*size+size
    let newArticles = articles.slice(start,end)
    return {
      code: 1,
      message: 'success',
      data: {
        datalist: newArticles,
        total:articles.length
      }
    }
  }
}
