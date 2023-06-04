
//resize images from Cloudinary using the url. First parameter is the cloudinary url. Second parameter is for how you'd like to 
//resize image. an example of this could be resizeImage(msg.image_path,'c_fill,h_150,w_150').
export const resizeImage = (img,size) => {
    const first = img?.slice(0,50)
    const last = img?.slice(49,img.length)
    return first + size + last
  };