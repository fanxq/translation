import languageMap from '../assets/config/languages';
let langList = Object.keys(languageMap).map(x => {
  return {
    code: x,
    name: languageMap[x]
  }
});

export default {
  props:{
    value: {
      type: String,
      require: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      langs: langList
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.showDialog();
      } else {
        this.closeDialog();
      }
    }
  },
  methods: {
    onItemSeleted(code) {
      console.log(code);
      this.$emit('input', code);
    },
    showDialog() {
      this.$refs.dlg.showModal();
    },
    closeDialog() {
      this.$refs.dlg.close();
    },
    close() {
      this.$emit('update:show', false);
    }
  },
  render() {
    return (
    <dialog ref="dlg">
      <header>
        <span class="title">
          <img src={chrome.extension.getURL('images/icon128.png')} class="logo"/>
          <h3>选择语言</h3>
        </span>
        <button class="btn-close" on={{click: this.close}} title="关闭">
          <img src={chrome.extension.getURL('images/close.png')}/>
        </button>
      </header>
      <section class="body">
        <ul>
          {
            this.langs.map(x => <li on={{click: () => this.onItemSeleted(x.code)}} class={x.code === this.value ? 'active' : ''}>{x.name}</li>)
          }
        </ul>
      </section>
    </dialog>)
  }
}