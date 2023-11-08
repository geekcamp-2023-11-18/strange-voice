import StrangeVoiceVolume from "./strangeVoiceVolume.jsx"
import React from "react"

function StrangeVoice() {
  let flag_speech = 0;
  let speech_text_num = 0;
  let pushButton = false;
  
  const childRef = React.useRef()

  function vr_function() {
      if(pushButton == false){
        childRef.current.parentAdd()
        pushButton = true;
      }

      window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
      let recognition = new webkitSpeechRecognition();
      recognition.lang = 'ja';
      recognition.interimResults = true;// 暫定(途中)結果も返すかどうか
      recognition.continuous = true;// 連続的に認識を行うかどうか

      // 音声認識をスタート
      recognition.onsoundstart = function() {
          document.getElementById('status').innerHTML = "認識中";
      };

      recognition.onnomatch = function() {
          document.getElementById('status').innerHTML = "もう一度試してください";
      };
      // なにかしらのエラー
      recognition.onerror = function() {
          document.getElementById('status').innerHTML = "エラー";
          if(flag_speech == 0)
            vr_function();
      };
      // 音声認識をストップ
      recognition.onsoundend = function() {
          document.getElementById('status').innerHTML = "停止中";
            vr_function();
      };
      // 音声認識の結果
      recognition.onresult = function(event) {
          let results = event.results;
          for (let i = event.resultIndex; i < results.length; i++) {
              if (results[i].isFinal)
              {
                  document.getElementById('result_text').innerHTML = results[i][0].transcript;
                  vr_function();
              }
              else
              {
                  document.getElementById('result_text').innerHTML = results[i][0].transcript;
                  flag_speech = 1;
              }
          }
          speech_text_num = getTextareaNum();
      };
      flag_speech = 0;
      document.getElementById('status').innerHTML = "start";
      recognition.start();
  }

  // テキストエリアの文字数を取得
  function getTextareaNum(){
    const textarea = document.getElementById('result_text');
    const textareaNum = textarea.value.length;
    console.log(textarea.value + " " + textareaNum);
    return textareaNum;
  }

  return (
    <>
      <input
        type="button"
        value="Recognition Start"
        onClick={vr_function}
      />
      <textarea id='result_text' cols="30" rows="10"></textarea>
      <p id="status"></p>
      <StrangeVoiceVolume ref={childRef}/>
    </>
  );
}

export default StrangeVoice;
