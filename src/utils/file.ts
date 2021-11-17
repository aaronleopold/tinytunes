type FilePickerConfig = {
  name: string;
  extensions: string[];
  dir?: boolean;
};

export default function pickFile({ name, extensions, dir }: FilePickerConfig) {
  // @ts-ignore
  const result = window?.__TAURI__?.dialog?.open({
    directory: dir,
    filters: [{ name, extensions }]
  });

  if (!result) {
    return null;
  }

  return result
    .then((filepath: string | null) => {
      return filepath;
    })
    .catch((err: any) => console.log(err));
}
