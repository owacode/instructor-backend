// //  MongoDB Models
// const VideoPosted= require('../../model/video_posted');

// class DeleteOperationController{
//   // This methord is for deleting the unpproved blog
//   // when we approved that blog
//   deleteVideo(id){
//     return new Promise((resolve, reject)=> {
//     VideoPosted.findByIdAndDelete({_id:id})
//     .then(result =>{
//       console.log("Video deleted!!");
//       resolve(result);
//     })
//     .catch(err =>{
//       console.log("Error in Deleting Video!!", err);
//       reject(err);
//     })
//     });
// }
// }

// module.exports= new DeleteOperationController();
