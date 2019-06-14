package com.ilobbyapp;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class ActivityModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    public static final int REQ_CODE = 101;
    Promise promise;

    public ActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Nonnull
    @Override
    public String getName() {
        return "Activity";
    }

    @ReactMethod
    public void openCamera(Promise promise) {
        this.promise = promise;
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, PicturePreviewActivity.class);
        if (currentActivity != null) {
            currentActivity.startActivityForResult(intent, REQ_CODE);
        }
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        this.promise.resolve(data.getDataString());
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
