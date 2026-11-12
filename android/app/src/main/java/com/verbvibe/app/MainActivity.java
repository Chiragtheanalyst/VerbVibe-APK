package com.verbvibe.app;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.webkit.JavascriptInterface;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;

public class MainActivity extends BridgeActivity {
    private TextToSpeech tts;
    private boolean ttsReady = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int res = tts.setLanguage(new Locale("en", "IN"));
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    tts.setLanguage(Locale.US);
                }
                ttsReady = true;
            }
        });

        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {}

            @Override
            public void onRangeStart(String utteranceId, int start, int end, int frame) {
                runOnUiThread(() -> {
                    if (bridge != null && bridge.getWebView() != null) {
                        bridge.getWebView().evaluateJavascript(
                            "window.__onNativeTTSBoundary && window.__onNativeTTSBoundary(" + start + "," + end + ");",
                            null
                        );
                    }
                });
            }

            @Override
            public void onDone(String utteranceId) {
                runOnUiThread(() -> {
                    if (bridge != null && bridge.getWebView() != null) {
                        bridge.getWebView().evaluateJavascript(
                            "window.__onNativeTTSEnd && window.__onNativeTTSEnd();",
                            null
                        );
                    }
                });
            }

            @Override
            public void onError(String utteranceId) {
                onDone(utteranceId);
            }
        });

        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().addJavascriptInterface(new Object() {
                @JavascriptInterface
                public void speak(String text, float rate, float pitch) {
                    if (!ttsReady || tts == null) return;
                    tts.setSpeechRate(rate);
                    tts.setPitch(pitch);
                    Bundle params = new Bundle();
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, "verbvibe_utt");
                }

                @JavascriptInterface
                public void stop() {
                    if (tts != null) {
                        tts.stop();
                    }
                }
            }, "AndroidTTS");
        }
    }

    @Override
    public void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
