use serde::Serialize;

#[derive(Serialize)]
struct WorkspaceMeta {
    framework: &'static str,
    platform: &'static str,
    runtime: &'static str,
    shell: &'static str,
}

#[tauri::command]
fn workspace_meta() -> WorkspaceMeta {
    WorkspaceMeta {
        framework: "SolidJS + Tauri v2",
        platform: std::env::consts::OS,
        runtime: "Rust bridge ready",
        shell: "Elegant Stack Desktop",
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![workspace_meta])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
