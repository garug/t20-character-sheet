<template>
  <v-app>
    <v-content class="my-0 my-lg-3" stlye="position: relative">
      <v-container style="position: relative">
        <v-form>
          <v-container>
            <v-row class="d-flex flex-wrap align-end">
              <v-col cols="12" md="7">
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-text-field
                      id="characterName"
                      v-model="form.character.name"
                      label="Nome do Personagem"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      id="playerName"
                      v-model="form.player"
                      label="Jogador"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      id="characterRace"
                      v-model="form.character.race"
                      label="Raça"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                      class="mt-1"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      id="characterOrigin"
                      v-model="form.character.origin"
                      label="Origem"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                      class="mt-1"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row
                      dense
                      v-for="(element, index) in form.character.class"
                      :key="'class_container_' + index"
                    >
                      <v-col cols="6" :key="'class_' + index">
                        <v-text-field
                          :id="'characterClass_' + element.name"
                          v-model="element.name"
                          label="Classe"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                      <v-col cols="3" :key="'class_level_' + index">
                        <v-text-field
                          type="number"
                          :id="'characterLevel_' + element.name"
                          v-model="element.level"
                          label="Nível"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                      <v-col cols="3" :key="'remove_' + index">
                        <v-btn
                          @click="removeClass(element)"
                          text
                          block
                          :disabled="form.character.class.length === 1"
                          color="error"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-btn @click="newClass" block color="primary">Nova Classe</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="order-first order-lg-last order-xl-last">
                <v-img src="./imgs/logo.png" aspect-ratio="4.355704697986577" />
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col md="7">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" id="characterAtbs">
                    <v-row v-for="(atb, index) in atbs" :key="index">
                      <v-col class="py-0" cols="12">
                        <label class="ma-0">{{atb.name}}</label>
                      </v-col>
                      <v-col class="d-flex py-0 justify-center align-center" lg="12">
                        <v-btn @click="decrement(atb)" color="primary" small>-</v-btn>
                        <h1 class="px-3 display-2">{{atb.value}}</h1>
                        <v-btn @click="increment(atb)" color="primary" small>+</v-btn>
                        <p class="title ml-3 text-center ma-0">
                          <span class="caption">Mod.</span>
                          <span class="primary--text">{{modifiers[atb.short]}}</span>
                        </p>
                      </v-col>
                      <v-col v-if="index != atbs.length - 1" cols="12 pb-3 pt-0">
                        <v-divider />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6" id="specs">
                    <label>Pontos de Vida</label>
                    <v-row dense>
                      <v-col class="col form-group">
                        <v-text-field
                          id="hpMax"
                          type="number"
                          v-model="form.character.hp.max"
                          label="Máximo"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          id="hpActual"
                          label="Atual"
                          type="number"
                          v-model="form.character.hp.actual"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                    </v-row>
                    <label>Pontos de Mana</label>
                    <v-row dense>
                      <v-col class="col form-group">
                        <v-text-field
                          id="mpMax"
                          label="Máximo"
                          type="number"
                          v-model="form.character.mp.max"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          id="mpActual"
                          label="Atual"
                          type="number"
                          v-model="form.character.mp.actual"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                    </v-row>
                    <v-divider class="mb-3" />
                    <v-textarea
                      label="Outras Características"
                      counter="500"
                      maxlength="500"
                      :key="'others'"
                      v-model="form.character.others"
                      class="form-control"
                      rows="10"
                      style="font-size: 11px"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-container>
                <label>Ataques</label>
                <v-row
                  v-for="(move, index) in form.character.moves"
                  :key="'col_move_' + index"
                  :id="'characterMove_' + index"
                  dense
                >
                  <v-col cols="12" md="auto">
                    <v-text-field
                      id="atackName"
                      label="Nome"
                      v-model="move.name"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="6" md="auto">
                    <v-text-field
                      id="atackBonus"
                      label="Bônus de Ataque"
                      v-model="move.bonus"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="6" md="auto">
                    <v-text-field
                      id="damage"
                      label="Dano"
                      v-model="move.damage"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="6" md="auto">
                    <v-text-field
                      id="critical"
                      label="Crítico"
                      v-model="move.critical"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="6" md="auto">
                    <v-text-field
                      id="type"
                      label="Tipo"
                      v-model="move.type"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="6" md="auto">
                    <v-text-field
                      id="range"
                      label="Alcance"
                      v-model="move.range"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="12"></v-col>
                </v-row>
                <v-btn
                  :disabled="form.character.moves.length === 4"
                  @click="newMove"
                  block
                  color="primary"
                >Novo Ataque</v-btn>
              </v-container>
              <v-divider />
              <v-container id="habilities-spells">
                <label for>Habilidades, Talentos e Magias</label>
                <v-row dense>
                  <v-col cols="12" md="6" :key="index" v-for="(e, index) in form.character.talents">
                    <v-text-field
                      :id="'talent_' + index"
                      v-model="e.name"
                      single-line
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col lg="12">
                    <v-btn
                      @click="newTalent"
                      :disabled="form.character.talents.length === 24"
                      block
                      color="primary"
                    >Nova Habilidade, Talento ou Magia</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col md="5">
              <v-container id="armorClass">
                <label>Classe de Armadura</label>
                <v-row align="center" dense>
                  <v-col md="2" class="flex-grow-0">
                    <p class="text-right display-2 ma-0">{{totalArmorClass}}</p>
                  </v-col>
                  <v-col md="2" class="flex-grow-0">
                    <p class="title ma-0 text-no-wrap">= 10 +</p>
                  </v-col>
                  <v-col cols="11" md="7">
                    <v-text-field
                      id="ac_mod"
                      disabled
                      :value="modifiers.des"
                      label="Mod. Destreza"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                      class="mx-1"
                    />
                  </v-col>
                  <v-col md="1" class="flex-grow-0">
                    <p class="title text-center ma-0">+</p>
                  </v-col>
                  <v-col cols="11" md="5">
                    <v-text-field
                      id="ac_armor"
                      label="Armadura"
                      type="number"
                      v-model="form.character.armorClass.armor"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                      class="mx-1"
                    />
                  </v-col>
                  <v-col md="1" class="flex-grow-0">
                    <p class="title text-center ma-0">+</p>
                  </v-col>
                  <v-col cols="11" md="5">
                    <v-text-field
                      id="ac_shield"
                      label="Escudo"
                      type="number"
                      v-model="form.character.armorClass.shield"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                      class="mx-1"
                    />
                  </v-col>
                  <v-col md="1" class="flex-grow-0">
                    <p class="title text-center ma-0">+</p>
                  </v-col>
                  <v-col cols="11" md="11">
                    <v-text-field
                      id="ac_others"
                      label="Outros"
                      type="number"
                      v-model="form.character.armorClass.others"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                      class="ml-1"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-container id="skills">
                <v-col lg="12">
                  <p class="ma-0">
                    <label>Selecione as perícias treinadas</label>
                    <!-- <v-chip class="ma-2" color="primary">0/10</v-chip> -->
                  </p>
                </v-col>
                <v-row dense>
                  <template v-for="(e, index) in pericias">
                    <v-col cols="4" md="3" v-if="e.name !== 'oficio'" :key="index">
                      <v-checkbox
                        class="ma-0"
                        hide-details="auto"
                        v-model="e._selected"
                        style="font-size: 12px !important"
                        :dense="dense"
                      >
                        <template v-slot:label>
                          <span style="font-size: 11px; text-transform: capitalize">{{e.name}}</span>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </template>
                </v-row>
              </v-container>
              <v-container class="inventory">
                <label>Equipamento</label>
                <v-row dense>
                  <v-col
                    v-for="(e, index) in form.character.equips"
                    cols="12"
                    :key="'equip_' + index"
                  >
                    <v-text-field
                      :id="'equip_' + index"
                      v-model="e.name"
                      single-line
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      :disabled="form.character.equips.length === 8"
                      @click="newEquip"
                      block
                      color="primary"
                    >Novo Equipamento</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-divider />
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="tibares"
                      v-model="form.character.money.tibar"
                      label="T$"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="gold"
                      label="TO"
                      v-model="form.character.money.gold"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-form>
        <v-divider />
        <p class="text-center">
          made with
          <span style="color: #e74c3c">♥</span> by
          <a href="http://garug.com.br" target="_blank">garug</a>
        </p>
      </v-container>
      <v-speed-dial fixed bottom right>
        <template v-slot:activator>
          <v-btn color="blue darken-2" dark fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-btn @click="exportPDF()" fab dark small color="green">
          <v-icon>mdi-file-download</v-icon>
        </v-btn>
        <v-btn
          link
          :href="jsonLink"
          :download="(form.character.name || 'character-sheet') + '.json'"
          fab
          dark
          small
          color="blue"
        >
          <v-icon>mdi-file-export</v-icon>
        </v-btn>
        <v-btn @click.stop="openImport" fab dark small color="indigo">
          <v-icon>mdi-file-import</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-content>
    <ImportFile ref="importDialog" @result="handleImportFile" />
  </v-app>
</template>

<script>
import jsPDF from "jspdf";
import jsonPericias from "./assets/pericias.json";
import jsonAtbs from "./assets/atributtes.json";
import ImportFile from "./components/dialogs/ImportFile";

export default {
  name: "app",
  data() {
    return {
      outlined: true,
      dense: true,
      max: 18,
      min: 8,
      importedFile: null,
      form: {
        character: {
          name: "",
          race: "",
          origin: "",
          class: [
            {
              name: "",
              level: 1
            }
          ],
          armorClass: {
            armor: 0,
            shield: 0,
            others: 0
          },
          hp: {
            max: 0,
            actual: 0
          },
          mp: {
            max: 0,
            actual: 0
          },
          moves: [
            {
              name: "",
              bonus: "",
              damage: "",
              critical: "",
              type: "",
              range: ""
            }
          ],
          talents: [
            {
              name: ""
            }
          ],
          equips: [
            {
              name: ""
            }
          ],
          money: {
            tibar: 0,
            gold: 0
          },
          others: ""
        },
        player: ""
      },
      atbs: jsonAtbs,
      pericias: jsonPericias
    };
  },
  components: {
    ImportFile
  },
  methods: {
    exportPDF() {
      const character = this.form.character;
      const pdfName = character.name || "character-sheet";
      const img = new Image();
      const src = "/char.jpg";
      img.src = src;
      const doc = new jsPDF();
      const defaultFontSize = 12;
      doc.setFontSize(defaultFontSize);
      const width = doc.internal.pageSize.getWidth().toFixed();
      const height = doc.internal.pageSize.getHeight().toFixed();
      doc.addImage(img, "JPEG", 0, 0, width, height);
      // Dados do Personagem
      const classLevel = character.class.reduce((acc, e, index) => {
        const separator = index === character.class.length - 1 ? "" : " | ";
        return `${acc}${e.name}, ${e.level}${separator}`;
      }, "");
      doc.text(11.5, 20.8, character.name);
      doc.text(74.5, 20.8, this.form.player);
      doc.text(11.5, 30.8, character.race);
      doc.text(43.5, 30.8, character.origin);
      doc.text(75, 30.8, classLevel);
      // Atributos
      doc.setFontSize(20);
      const margem = 14;
      this.atbs.forEach((atb, index) => {
        const elementMargin = atb.value / 10 >= 1 ? margem : margem + 2.2;
        doc.text(elementMargin + index * 20, 52.8, atb.value.toString());
      });
      // Modificadores de Atributo
      doc.setFontSize(10);
      this.atbs.forEach((atb, index) => {
        const mod = this.modifiers[atb.short];
        const elementMargin = margem + 3;
        doc.text(elementMargin + index * 20, 60, mod.toString());
      });
      doc.setFontSize(defaultFontSize);
      // Vida e mana
      doc.text(17, 74, character.hp.max.toString());
      doc.text(28, 74, character.hp.actual.toString());
      doc.text(77, 74, character.mp.max.toString());
      doc.text(88, 74, character.mp.actual.toString());
      // Ataques
      doc.setFontSize(9);
      const defaultRow = 7.5;
      character.moves.forEach((move, index) => {
        const row = 98.7 + defaultRow * index;
        doc.text(13, row, move.name);
        doc.text(48, row, move.bonus);
        doc.text(64, row, move.damage);
        doc.text(80, row, move.critical);
        doc.text(96, row, move.type);
        doc.text(111, row, move.range);
      });
      // CA
      doc.setFontSize(defaultFontSize);
      const armor = character.armorClass;
      const caLine = 142.2;
      doc.text(16, caLine, this.totalArmorClass.toString());
      doc.text(38, caLine, this.modifiers["des"].toString());
      doc.text(48, caLine, armor.armor.toString());
      doc.text(58, caLine, armor.shield.toString());
      doc.text(68, caLine, armor.others.toString());
      // Other specs
      doc.setFontSize(6);
      doc.text(81.7, 136, character.others, {
        align: "justify",
        ma0xWidth: 42
      });
      0;
      // Perícias
      const pDefaultRow = 4.65;
      const vm = this;
      this.pericias.forEach((e, index) => {
        if (e.name !== "oficio") {
          const row = 53.5 + pDefaultRow * index;
          const trained = e._selected ? this.bonusPericia() : 0;
          const totalLevel = parseInt((this.totalLevel / 2).toFixed(0));
          const mod = vm.modifiers[e.property];
          doc.text(159, row - 1.2, (totalLevel + mod + trained).toString());
          doc.text(169, row, totalLevel.toString());
          doc.text(177, row, mod.toString());
          doc.text(185, row, trained.toString());
          doc.text(193, row, "");
        }
      });
      // Equipamento
      doc.setFontSize(defaultFontSize);
      const equips = character.equips;
      const eDefaultRow = 8;
      equips.forEach((e, index) => {
        const row = 208.5 + eDefaultRow * index;
        doc.text(134, row, e.name);
      });
      // Habilidades
      doc.setFontSize(defaultFontSize);
      const talentLine = 8;
      let row = 0;
      character.talents.forEach((e, index) => {
        const odd = index % 2 === 0;
        if (odd) {
          doc.text(13, 184 + talentLine * (index - row), e.name);
        } else {
          doc.text(72, 184 + talentLine * (index - ++row), e.name);
        }
      });
      // Money
      doc.setFontSize(10);
      const moneyLine = 272;
      doc.text(142, moneyLine, character.money.tibar.toString());
      doc.text(172, moneyLine, character.money.gold.toString());
      // Salva
      doc.save(pdfName + ".pdf");
    },
    openImport() {
      this.$refs.importDialog.open();
    },
    handleImportFile(value) {
      if (value) {
        this.form.character = value.character;
        this.form.player = value.player;
        value.skills.forEach(
          e => (this.pericias.find(p => p.name === e)._selected = true)
        );
        value.attributes.forEach((e, index) => (this.atbs[index].value = e));
      }
    },
    bonusPericia() {
      if (this.totalLevel >= 15) {
        return 6;
      } else if (this.totalLevel >= 7) {
        return 4;
      } else {
        return 2;
      }
    },
    compute(atb) {
      switch (atb.value) {
        case 8:
          return -2;
        case 9:
          return -1;
        case 11:
          return 1;
        case 12:
          return 2;
        case 13:
          return 3;
        case 14:
          return 4;
        case 15:
          return 6;
        case 16:
          return 8;
        case 17:
          return 11;
        case 18:
          return 14;
        default:
          return 0;
      }
    },
    newClass() {
      this.form.character.class.push({ name: "", level: 1 });
    },
    removeClass(e) {
      const deleted = this.form.character.class.findIndex(e2 => e2 === e);
      this.form.character.class.splice(deleted, 1);
    },
    newMove() {
      this.form.character.moves.push({
        name: "",
        bonus: "",
        damage: "",
        critical: "",
        type: "",
        range: ""
      });
    },
    newEquip() {
      this.form.character.equips.push({
        name: ""
      });
    },
    newTalent() {
      this.form.character.talents.push({
        name: ""
      });
    },
    increment(atb) {
      // if (atb.value < 18 && this.remaining > 0) {
      //   atb.value++;
      // }
      // if (this.remaining < 0) {
      //   atb.value--;
      // }
      atb.value++;
    },
    decrement(atb) {
      atb.value--;
      // if (atb.value > 8) {
      // }
    }
  },
  computed: {
    remaining() {
      const totalInvested = this.atbs
        .map(e => this.compute(e))
        .reduce((e, acc) => (acc += e), 0);
      return 20 - totalInvested;
    },
    totalLevel() {
      return this.form.character.class.reduce(
        (acc, e) => acc + parseInt(e.level),
        0
      );
    },
    modifiers() {
      return this.atbs.reduce((acc, atb) => {
        acc[atb.short] = Number((atb.value / 2.1 - 5).toFixed(0));
        return acc;
      }, {});
    },
    totalArmorClass() {
      const armorClass = this.form.character.armorClass;
      const totalInvested =
        parseInt(armorClass.armor) +
        parseInt(armorClass.shield) +
        parseInt(armorClass.others);
      return 10 + this.modifiers.des + (totalInvested || 0);
    },
    jsonLink() {
      const contentType = "application/json";
      const json = {
        player: this.form.player,
        character: this.form.character,
        skills: this.selectedSkills,
        attributes: this.atbs.map(e => e.value)
      };
      const dData = JSON.stringify(json);
      const blob = new Blob([dData], { type: contentType });
      return window.URL.createObjectURL(blob);
    },
    selectedSkills() {
      return this.pericias.filter(e => e._selected).map(e => e.name);
    }
  }
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "./styles/app.scss";

#app {
  background: url("./imgs/bg.jpg");
  background-attachment: fixed;
  background-position: center;
}

.container {
  max-width: 1366px !important;
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
