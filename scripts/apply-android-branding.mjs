import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const androidRoot=path.join(root,'android','app','src','main');
const res=path.join(androidRoot,'res');
function write(rel,content){const p=path.join(res,rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,content,'utf8');console.log('[branding] wrote',rel)}

write('values/chungyack_icon_colors.xml',`<?xml version="1.0" encoding="utf-8"?><resources><color name="chungyack_icon_bg">#14245C</color></resources>`);
write('drawable/chungyack_icon_foreground.xml',`<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108">
  <path android:fillColor="@android:color/transparent" android:strokeColor="#29B8F6" android:strokeWidth="6.5" android:strokeLineCap="round" android:strokeLineJoin="round" android:pathData="M22,57 L22,43 L49,20 L74,42 L74,56 M25,54 L25,84 L59,84 M43,84 L43,52"/>
  <path android:fillColor="#14245C" android:strokeColor="#B9FFE0" android:strokeWidth="5.5" android:pathData="M67,49 A18,18 0,1 1,66.9 49"/>
  <path android:fillColor="@android:color/transparent" android:strokeColor="#B9FFE0" android:strokeWidth="6" android:strokeLineCap="round" android:pathData="M80,75 L95,90"/>
  <path android:fillColor="#55DAB6" android:pathData="M59,57 A4,4 0,0 1,65,53 A4,4 0,0 1,69,55 A4,4 0,0 1,65,59 A4,4 0,0 1,59,57"/>
  <path android:fillColor="#58CFFF" android:pathData="M19,19 L21,24 L26,26 L21,28 L19,33 L17,28 L12,26 L17,24 Z"/>
  <path android:fillColor="#E4F05A" android:pathData="M87,25 L89,31 L95,33 L89,35 L87,41 L85,35 L79,33 L85,31 Z"/>
</vector>`);
const adaptive=`<?xml version="1.0" encoding="utf-8"?><adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/chungyack_icon_bg"/><foreground android:drawable="@drawable/chungyack_icon_foreground"/><monochrome android:drawable="@drawable/chungyack_icon_foreground"/></adaptive-icon>`;
write('mipmap-anydpi-v26/ic_launcher.xml',adaptive);write('mipmap-anydpi-v26/ic_launcher_round.xml',adaptive);

const javaPath=path.join(androidRoot,'java','com','kimjae134679','chungyack','MainActivity.java');
fs.mkdirSync(path.dirname(javaPath),{recursive:true});
fs.writeFileSync(javaPath,`package com.kimjae134679.chungyack;

import android.app.AlertDialog;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private boolean exitDialogVisible=false;
  @Override public void onBackPressed(){
    try{getBridge().getWebView().evaluateJavascript("(function(){try{return String(!!(window.__CY_HANDLE_NATIVE_BACK__&&window.__CY_HANDLE_NATIVE_BACK__()));}catch(e){return 'false';}})()",value->{boolean consumed=value!=null&&value.toLowerCase().contains("true");if(!consumed)showExitConfirm();});}
    catch(Throwable t){showExitConfirm();}
  }
  private void showExitConfirm(){if(exitDialogVisible||isFinishing())return;exitDialogVisible=true;runOnUiThread(()->new AlertDialog.Builder(this).setTitle("청약 레이더").setMessage("앱을 종료하시겠습니까?").setNegativeButton("취소",(d,w)->{exitDialogVisible=false;d.dismiss();}).setPositiveButton("종료",(d,w)->{exitDialogVisible=false;finishAffinity();}).setOnCancelListener(d->exitDialogVisible=false).show());}
}
`,'utf8');
console.log('[branding] ChungYack Radar icon + native Back fallback applied.');
