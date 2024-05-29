// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::{Command, Output};
use std::str;
use std::fs::File;
use std::io::prelude::*;
use std::os::windows::process::CommandExt; // Import the necessary trait for Windows

const CREATE_NO_WINDOW: u32 = 0x08000000;


#[tauri::command]
fn save_document(text: String) -> String {
  let mut file = File::create("documents/firstnote.txt").expect("Unable to create file");
  file.write_all(text.as_bytes()).expect("Unable to write data");
  "Document saved".to_string()
}

#[tauri::command]
fn run_javascript(text: String) -> String {
  let output: Output = Command::new("node")
      .arg("-e")
      .arg(&text)
      .creation_flags(CREATE_NO_WINDOW)
      .output()
      .expect("Failed to execute command");
  if output.status.success() {
      let stdout = output.stdout;
      let stdout_str = str::from_utf8(&stdout).expect("Failed to convert stdout to string");
      format!("{}", stdout_str)
  } else {
      let stderr = output.stderr;
      let stderr_str = str::from_utf8(&stderr).expect("Failed to convert stderr to string");
      format!("stderr: {}", stderr_str)
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_document, run_javascript])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
