var file_type=$("#myfile").val();
var audio_link='/static/audio/'+file_type+'.mp3';
console.log(audio_link)
var test=$("#player-track").val();
var test2=$(".player-track").val();
var track=$("#song_title").val();
var showtrack=track;
if(track.length >25) {
    showtrack= track.substring(0,22) + '...';
}

var drum = $("#drumsinput");
var ins = $("#instrumentinput");
var vocals = $("#vocalsinput");
var others = $("#othersinput");
console.log(drum)

$(function()
{
    var playerTrack = $("#player-track"), bgArtwork = $('#bg-artwork'), bgArtworkUrl, albumName = $('#album-name'), trackName = $('#track-name'), albumArt = $('#album-art'), sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'), sHover = $('#s-hover'), playPauseButton = $("#play-pause-button"),  i = playPauseButton.find('i'), tProgress = $('#current-time'), tTime = $('#track-length'), seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false, albums = [showtrack], trackNames = ['Toggle to experiment'], albumArtworks = ['_1'], trackUrl = ['/static/audio/drums.wav','/static/audio/bass.wav','/static/audio/vocals.wav','/static/audio/other.wav'], playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

    
    
    
    function playPause()
    {
        setTimeout(function()
        {

            var lis = [drum.is(':checked'),ins.is(':checked'),vocals.is(':checked'),others.is(':checked')];
            
            if(audioins.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audiodrum.play();
                audioins.play();
                audiovocals.play();
                audioothers.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audiodrum.pause();
                audioins.pause();
                audiovocals.pause();
                audioothers.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audiodrum.duration * (seekT / sArea.outerWidth());
		// seekLoc = audio2.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audiodrum.currentTime = seekLoc;
        audiovocals.currentTime = seekLoc;
        audioins.currentTime = seekLoc;
        audioothers.currentTime = seekLoc;

		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audiodrum.currentTime / 60);
        curSeconds = Math.floor(audiodrum.currentTime - curMinutes * 60);
        // curMinutes = Math.floor(audio2.currentTime / 60);
		// curSeconds = Math.floor(audio2.currentTime - curMinutes * 60);
		
		// durMinutes = Math.floor(audio1.duration / 60);
        // durSeconds = Math.floor(audio1.duration - durMinutes * 60);
        durMinutes = Math.floor(audiodrum.duration / 60);
		durSeconds = Math.floor(audiodrum.duration - durMinutes * 60);
		
        playProgress = (audiodrum.currentTime / audiodrum.duration) * 100;
        // playProgress = (audio2.currentTime / audio2.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < albumArtworks.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audiodrum.src = trackUrl[0];
            audioins.src = trackUrl[1];
            audiovocals.src = trackUrl[2];
            audioothers.src = trackUrl[3];

            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audiodrum.play();
                audioins.play();
                audiovocals.play();
                audioothers.play();
                
                
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('img.active').removeClass('active');
            $('#'+currArtwork).addClass('active');
            
            bgArtworkUrl = $('#'+currArtwork).attr('src');

            bgArtwork.css({'background-image':'url('+bgArtworkUrl+')'});
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	
        audiodrum = new Audio();
        audioins = new Audio();
        audiovocals = new Audio();
        audioothers = new Audio();

        
        selectTrack(0);
        if (file_type=='karaoke'){

            if(vocals.is(':checked')==false){
                audiovocals.volume = 0.0;
            }
            if(ins.is(':checked')==false){
                audioins.volume = 0.0;
        }}
        else{
            if(drum.is(':checked')==false){
                audiodrum.volume = 0.0;
            }
            if(vocals.is(':checked')==false){
                audiovocals.volume = 0.0;
            }
            if(ins.is(':checked')==false){
                audioins.volume = 0.0;
            }
            if(others.is(':checked')==false){
                audioothers.volume = 0.0;
            }
        }


        audiodrum.loop = false;
        audioins.loop = false;
        audiovocals.loop = false;
        audioothers.loop = false;
		
        playPauseButton.on('click',playPause);
        

        if(file_type=='karaoke'){

            vocals.change(function() {
                if(vocals.is(':checked')==true){
                    audiovocals.volume = 1.0;
                }
                else {
                    audiovocals.volume = 0.0;
                } 
            });
            ins.change(function() {
                if(ins.is(':checked')==true){
                    audioins.volume = 1.0;
                    audiodrum.volume= 1.0;
                    audioothers.volume= 1.0;
                }
                else {
                    audioins.volume = 0.0;
                    audiodrum.volume= 0.0;
                    audioothers.volume= 0.0;

                } 
            });

        }
        
        else{
                drum.change(function() {
                    if(drum.is(':checked')==true){
                        // console.log('drum');
                        audiodrum.volume = 1.0;
                    }
                    else {
                        audiodrum.volume = 0.0;
                        // console.log(audiodrum.volume);
                    } 
                });
                vocals.change(function() {
                    if(vocals.is(':checked')==true){
                        audiovocals.volume = 1.0;
                    }
                    else {
                        audiovocals.volume = 0.0;
                    } 
                });
                ins.change(function() {
                    if(ins.is(':checked')==true){
                        audioins.volume = 1.0;
                    }
                    else {
                        audioins.volume = 0.0;
                    } 
                });
                others.change(function() {
                    if(others.is(':checked')==true){
                        audioothers.volume = 1.0;
                    }
                    else {
                        audioothers.volume = 0.0;
                    } 
                });
            }
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audiodrum).on('timeupdate',updateCurrTime);
        $(audioins).on('timeupdate',updateCurrTime);
        $(audiovocals).on('timeupdate',updateCurrTime);
        $(audioothers).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ 
            alert("Thanks for liking it!. Stay tuned as a lot more is to come");
        } );


        playNextTrackButton.on('click',function(){ const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);

        // Set the HREF to a Blob representation of the data to be download
        

        // Use download attribute to set set desired file name
        if(file_type=="split"){
        // var filesForDownload = [];
        // filesForDownload( { path: "static/audio/bass.wav", name: track+"_bass.wav" } );
        // filesForDownload( { path: "static/audio/vocals.wav", name: "_vocals.wav" } );
        // filesForDownload( { path: "static/audio/drums.wav", name: "_drums.wav" } );
        // filesForDownload( { path: "static/audio/other.wav", name: "_others.wav" } );

        var filesForDownload = [{ path: "static/audio/bass.wav", name: track+"_bass.wav" },
        { path: "static/audio/vocals.wav", name: track+"_vocals.wav" } ,
        { path: "static/audio/drums.wav", name: track+"_drums.wav" } ,
        { path: "static/audio/other.wav", name: track+"_others.wav" }];    


        
        for( var n = 0; n < filesForDownload.length; n++ )
        {
            var download = filesForDownload[n];
            a.setAttribute( 'href', download.path );
            a.setAttribute( 'download', download.name );
            a.click();
        }
        // a.setAttribute("download", ["bass.mp3","vocals.mp3","drums.mp3","other.mp3"]);
        // 
    }

        else {
            a.href = "static/audio/karaoke.mp3";
            a.setAttribute("download", track+"_karaoke.mp3");
            a.click();
        }    
        // Trigger the download by simulating click
        
        // Cleanup
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
});
	}
    
	initPlayer();
});