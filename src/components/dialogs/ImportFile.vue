<template>
  <v-dialog max-width="500" v-model="visible">
    <v-card>
      <v-card-title class="headline">Importe uma ficha salva</v-card-title>
      <v-card-text>
        A ficha deve estar em formato específico, use somente que tenham sido exportados pela aplicação.
        <v-file-input ref="localImport" @change="importJSON" label="Arquivo de ficha"></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close(false)">Cancelar</v-btn>
        <v-btn color="primary" text @click="close(importedFile)" :disabled="!importedFile">Importar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ImportFile",

  data() {
    return {
      importedFile: null,
      reader: new FileReader(),
      visible: false
    };
  },

  methods: {
    importJSON(originalFile) {
      if (originalFile) {
        this.reader.readAsText(originalFile);
      } else {
        this.errorMessages.splice(0, this.errorMessages.length);
        this.importedFile = null;
      }
    },

    open() {
      this.visible = true;
    },

    close(payload) {
      this.visible = false;
      this.$emit("result", payload);
      this.$refs.localImport.reset();
    }
  },

  created() {
    this.reader.onload = textFile => {
      const json = JSON.parse(textFile.target.result);
      if ("character" in json && "player" in json && "skills" in json) {
        this.errorMessages.splice(0, this.errorMessages.length);
        this.importedFile = json;
      } else {
        this.errorMessages.push("Arquivo Inválido");
        this.importedFile = null;
      }
    };
  },

  computed: {
    errorMessages() {
      return this.$refs.localImport.errorMessages;
    }
  }
};
</script>