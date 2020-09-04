InboxSDK.load('1', 'sdk_sendspark-test_34ff6d4a5d').then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){

		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Insert a Picture",
			iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
			onClick: async function(event) {
				console.log('yeah---')
				const camera = await createCamera()
				const body = document.querySelector('body')
				body.appendChild(camera)
			},
		})

	})

})

async function createCamera() {
	const stream = await navigator.mediaDevices.getUserMedia({
	video: true,
	audio: {
		echoCancellation: true,
		noiseSuppression: true,
		channelCount: 2,
		}
	})

	const camera = document.createElement('div')
	camera.setAttribute('style', `
		position: absolute;
		z-index: 10000;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	`)
	camera.onclick = function () {
		stream.getTracks().forEach(track => { track.stop() })
		camera.remove()
	}

	const video = await createVideo()
	video.srcObject = stream
	
	camera.appendChild(video)

	return camera;
}

async function createVideo() {
	const video = document.createElement('video')
	video.setAttribute('autoplay', true)
	video.setAttribute('style', `
		z-index: 10001;
		border-radius: 8px;
	`)
	video.onloadedmetadata = (e) => {
		video.play();
	};
	return video
}
