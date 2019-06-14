package com.ilobbyapp;

import android.content.Intent;
import android.graphics.Bitmap;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.facebook.react.ReactActivity;
import com.otaliastudios.cameraview.BitmapCallback;
import com.otaliastudios.cameraview.PictureResult;

import java.lang.ref.WeakReference;

public class PicturePreviewActivity extends ReactActivity {

    private static WeakReference<PictureResult> image;
    public Bitmap mainBitmap;

    public static void setPictureResult(@Nullable PictureResult im) {
        image = im != null ? new WeakReference<>(im) : null;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_picture_preview);
        final ImageView imageView = findViewById(R.id.image);
        final ImageView accept = findViewById(R.id.accept);
        final ImageView reject = findViewById(R.id.reject);
        PictureResult result = image == null ? null : image.get();
        if (result == null) {
            finish();
            return;
        }
        result.toBitmap(1000, 1000, new BitmapCallback() {
            @Override
            public void onBitmapReady(Bitmap bitmap) {
                mainBitmap = bitmap;
                imageView.setImageBitmap(bitmap);
            }
        });

        accept.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.putExtra("image", mainBitmap);
                setResult(RESULT_OK, intent);
                finish();
            }
        });

        reject.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (!isChangingConfigurations()) {
            setPictureResult(null);
        }
    }
}
