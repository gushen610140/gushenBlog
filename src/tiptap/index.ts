import { markRaw } from "vue";
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  createVuetifyProTipTap,
  FontFamily,
  FontSize,
  Fullscreen,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Indent,
  Italic,
  Link,
  OrderedList,
  Strike,
  SubAndSuperScript,
  Table,
  TaskList,
  TextAlign,
  Underline,
  Video,
  VuetifyTiptap,
  VuetifyViewer,
} from "vuetify-pro-tiptap";
import "vuetify-pro-tiptap/style.css";
import SelectImage from "@/components/FunctionComp/SelectImage.vue";

export const vuetifyProTipTap = createVuetifyProTipTap({
  lang: "zhHans",
  components: {
    VuetifyTiptap,
    VuetifyViewer,
  },
  markdownTheme: "github",
  extensions: [
    BaseKit.configure({
      placeholder: {
        placeholder: "编辑器功能尚处于开发实验阶段...",
      },
    }),
    Bold,
    Italic,
    Underline,
    Strike,
    Code.configure({ divider: true }),
    Heading,
    TextAlign,
    FontFamily,
    FontSize,
    Color,
    Highlight.configure({ divider: true }),
    SubAndSuperScript.configure({ divider: true }),
    Clear.configure({ divider: true }),
    BulletList,
    OrderedList,
    TaskList,
    Indent.configure({ divider: true }),
    Link,
    Image.configure({
      imageTabs: [{ name: "SELECT", component: markRaw(SelectImage) }],
      // hiddenTabs: ['upload'],
      upload(file: File) {
        const url = URL.createObjectURL(file);
        console.log("mock upload api :>> ", url);
        return Promise.resolve(url);
      },
    }),
    Video,
    Table.configure({ divider: true }),
    Blockquote,
    HorizontalRule,
    CodeBlock.configure({ divider: true }),
    History.configure({ divider: true }),
    Fullscreen,
  ],
});
