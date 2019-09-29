import OSS from 'ali-oss'
import md5 from 'blueimp-md5'

const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: ''
})

export default async function(files) {
  const file = files.file
  let ext = file.name.split('.')
  ext = ext[ext.length - 1]
  const date = new Date()
  const dir = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  const name = `service/${dir}/${md5(date.getTime())}.${ext}`
  try {
    const size = 1 * 1024 * 1024
    const reuslt = await client.multipartUpload(name, file, { partSize: size })
    const url = `http://xxxxx/${reuslt['name']}`
    return new Promise(resolve => {
      resolve(url)
    })
    // files.data.logo.push({ url })
  } catch (e) {
    null
  }
}
