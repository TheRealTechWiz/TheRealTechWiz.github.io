const imageUpload = document.getElementById('imageUpload')
const btn = document.querySelector('button');
const vid = document.querySelector('video');
const namefield = document.querySelector('#name');
clickImage();

function recognition() {
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models')
  ]).then(start)

  async function start() {
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    const labeledFaceDescriptors = await loadLabeledImages()

    if (labeledFaceDescriptors[0] != false) {
      imageUpload.style.display = "block";
      btn.style.display = "none";
      vid.style.display = "none";
      namefield.style.display = "none";

      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
      let image
      let canvas
      document.body.append('Loaded')
      imageUpload.addEventListener('change', async () => {
        if (image) image.remove()
        if (canvas) canvas.remove()
        image = await faceapi.bufferToImage(imageUpload.files[0])
        container.append(image)
        canvas = faceapi.createCanvasFromMedia(image)
        container.append(canvas)
        const displaySize = { width: image.width, height: image.height }
        faceapi.matchDimensions(canvas, displaySize)
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          drawBox.draw(canvas)
        })
      })
    }
  }

  function loadLabeledImages() {
    let nameval = namefield.value;
    console.log(nameval)
    const labels = [nameval]
    console.log(labels)
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 1; i++) {
          const img = await faceapi.fetchImage(localStorage.getItem("Image"))
          try {
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
            descriptions.push(detections.descriptor)
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
          }
          catch (e) {
            alert("Face not Clear Try Again!!")
            return false;

          }
        }
      })
    )
  }
}
//-------------===========------------------
function clickImage() {
  imageUpload.style.display = "none";
  navigator.mediaDevices.getUserMedia({ video: true }) // request cam
    .then(stream => {
      vid.srcObject = stream; // don't use createObjectURL(MediaStream)
      return vid.play(); // returns a Promise
    })
    .then(() => { // enable the button
      btn.disabled = false;
      btn.onclick = e => {
        takeASnap()
        // .then(download);
      };
    })
    .catch(e => console.log('please use the fiddle instead'));

  function takeASnap() {
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    canvas.width = vid.videoWidth; // set its size to the one of the video
    canvas.height = vid.videoHeight;
    ctx.drawImage(vid, 0, 0); // the video
    var imgAsDataURL = canvas.toDataURL("image/jpeg");

    // Save image into localStorage
    try {
      localStorage.setItem("Image", imgAsDataURL);
      let image = document.querySelector('img');
      image.src = localStorage.getItem("Image");
      recognition();
    }
    catch (e) {
      console.log("Storage failed: " + e);
    }
  }
}
// function takeASnap(){
//   const canvas = document.createElement('canvas'); // create a canvas
//   const ctx = canvas.getContext('2d'); // get its context
//   canvas.width = vid.videoWidth; // set its size to the one of the video
//   canvas.height = vid.videoHeight;
//   ctx.drawImage(vid, 0,0); // the video
//   return new Promise((res, rej)=>{
//     canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
//   });
// }
// function download(blob){
//   // uses the <a download> to download a Blob
//   let a = document.createElement('a'); 
//   a.href = URL.createObjectURL(blob);
//   a.download = 'screenshot.jpg';
//   document.body.appendChild(a);
//   a.click();
// }


// function recognition(){
//   Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
//   ]).then(start)

//   async function start() {
//     const container = document.createElement('div')
//     container.style.position = 'relative'
//     document.body.append(container)
//     const labeledFaceDescriptors = await loadLabeledImages()
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
//     let image
//     let canvas
//     document.body.append('Loaded')
//     imageUpload.addEventListener('change', async () => {
//       if (image) image.remove()
//       if (canvas) canvas.remove()
//       image = await faceapi.bufferToImage(imageUpload.files[0])
//       container.append(image)
//       canvas = faceapi.createCanvasFromMedia(image)
//       container.append(canvas)
//       const displaySize = { width: image.width, height: image.height }
//       faceapi.matchDimensions(canvas, displaySize)
//       const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
//       const resizedDetections = faceapi.resizeResults(detections, displaySize)
//       const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
//       results.forEach((result, i) => {
//         const box = resizedDetections[i].detection.box
//         const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//         drawBox.draw(canvas)
//       })
//     })
//   }

//   function loadLabeledImages() {
//     const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Pratham Goyal', 'Thor', 'Tony Stark']
//     return Promise.all(
//       labels.map(async label => {
//         const descriptions = []
//         for (let i = 1; i <= 2; i++) {
//           const img = await faceapi.fetchImage(`labeled_images/${label}/${i}.jpg`)
//           console.log(img);
//           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//           descriptions.push(detections.descriptor)
//         }

//         return new faceapi.LabeledFaceDescriptors(label, descriptions)
//       })
//     )
//   }
// }
