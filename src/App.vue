<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>-->

    <v-content class="my-3">
      <v-container>
        <v-form>
          <v-container>
            <v-row class="d-flex align-end">
              <v-col md="7">
                <v-row dense>
                  <v-col md="6">
                    <v-text-field
                      id="characterName"
                      v-model="form.character.name"
                      label="Nome do Personagem"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      id="playerName"
                      v-model="form.player"
                      label="Jogador"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      id="characterRace"
                      v-model="form.character.race"
                      label="Raça"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      id="characterOrigin"
                      v-model="form.character.origin"
                      label="Origem"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      id="characterClass"
                      v-model="form.character.class"
                      label="Classe e Nível"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-img src="./imgs/logo.png" aspect-ratio="4.355704697986577" />
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col md="7">
              <v-container>
                <v-row>
                  <v-col id="characterAtbs">
                    <v-row v-for="(atb, index) in atbs" :key="index">
                      <v-col class="py-0" lg="12">
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
                      <v-col v-if="index != atbs.length - 1" sm="12 pb-3 pt-0">
                        <v-divider />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <label>Pontos de Vida</label>
                    <v-row>
                      <v-col class="col form-group">
                        <v-text-field
                          id="hpMax"
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
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                    </v-row>
                    <label>Pontos de Mana</label>
                    <v-row>
                      <v-col class="col form-group">
                        <v-text-field
                          id="mpMax"
                          label="Máximo"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          id="mpActual"
                          label="Atual"
                          hide-details="auto"
                          :dense="dense"
                          :outlined="outlined"
                        />
                      </v-col>
                    </v-row>
                    <v-divider class="mb-3" />
                    <v-textarea
                      label="Outras Características"
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
                <v-row dense id="characterMoves" class="form-row align-items-center">
                  <v-col lg="12">
                    <label>Ataques</label>
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="atackName"
                      label="Nome"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col class="col text-center">
                    <v-text-field
                      id="atackBonus"
                      label="Bônus de Ataque"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col class="col text-center">
                    <v-text-field
                      id="damage"
                      label="Dano"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col class="col text-center">
                    <v-text-field
                      id="critical"
                      label="Crítico"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col class="col text-center">
                    <v-text-field
                      id="type"
                      label="Tipo"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col class="col text-center">
                    <v-text-field
                      id="range"
                      label="Alcance"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col lg="12">
                    <v-btn block color="primary">Novo Ataque</v-btn>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-container id="habilities-spells">
                <label for>Habilidades, Talentos e Magias</label>
                <v-row dense>
                  <v-col lg="6" :key="index" v-for="(index) in 7">
                    <v-text-field
                      id="range"
                      single-line
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col lg="12">
                    <v-btn block color="primary">Nova Habilidade, Talento ou Magia</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col md="5">
              <v-container id="armorClass">
                <label>Classe de Armadura</label>
                <v-row dense>
                  <v-col md="8" class="col form-group" style="font-size: 11px">
                    <v-text-field
                      id="ac_total"
                      label="Total"
                      disabled
                      :value="totalArmorClass"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="4">
                    <p class="display-1">= 10+</p>
                  </v-col>
                  <v-col md="6" style="font-size: 11px">
                    <v-text-field
                      id="ac_mod"
                      disabled
                      :value="modifiers.des"
                      label="Mod. Destreza"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="6" style="font-size: 11px">
                    <v-text-field
                      id="ac_armor"
                      label="Armadura"
                      type="number"
                      v-model="form.character.armorClass.armor"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="6" style="font-size: 11px">
                    <v-text-field
                      id="ac_shield"
                      label="Escudo"
                      type="number"
                      v-model="form.character.armorClass.shield"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col md="6" style="font-size: 11px">
                    <v-text-field
                      id="ac_others"
                      label="Outros"
                      type="number"
                      v-model="form.character.armorClass.others"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-divider />
              <v-container id="skills" style="font-size: 12px">
                <v-row dense v-for="(index) in 10" :key="index">
                  <v-col md="12">
                    Acrobacia - Total:
                    <b>10</b>
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="half_level"
                      label="1/2 do Nível"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="mod_atb"
                      label="Mod. Atributo"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="training"
                      label="Treino"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="others"
                      label="Outros"
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-container class="inventory">
                <label>Equipamento</label>
                <v-row dense>
                  <v-col md="12" v-for="(index) in 3" :key="index">
                    <v-text-field
                      :id="'equip_' + index"
                      single-line
                      hide-details="auto"
                      :dense="dense"
                      :outlined="outlined"
                    />
                  </v-col>
                  <v-col lg="12">
                    <v-btn block color="primary">Novo Equipamento</v-btn>
                  </v-col>
                  <v-col sm="12">
                    <v-divider />
                  </v-col>
                  <v-col>
                    <v-text-field
                      id="tibares"
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
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    const defaultValue = 10;
    return {
      outlined: true,
      dense: true,
      defaultValue: 10,
      max: 18,
      min: 8,
      form: {
        character: {
          name: "",
          race: "",
          origin: "",
          class: "",
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
          other: ""
        },
        player: ""
      },
      atbs: [
        {
          name: "Força",
          short: "for",
          value: defaultValue
        },
        {
          name: "Destreza",
          short: "des",
          value: defaultValue
        },
        {
          name: "Constituição",
          short: "con",
          value: defaultValue
        },
        {
          name: "Inteligência",
          short: "int",
          value: defaultValue
        },
        {
          name: "Sabedoria",
          short: "sab",
          value: defaultValue
        },
        {
          name: "Carisma",
          short: "car",
          value: defaultValue
        }
      ]
    };
  },
  methods: {
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
    increment(atb) {
      if (atb.value < 18 && this.remaining > 0) {
        atb.value++;
      }
      if (this.remaining < 0) {
        atb.value--;
      }
    },
    decrement(atb) {
      if (atb.value > 8) {
        atb.value--;
      }
    }
  },
  computed: {
    remaining() {
      const totalInvested = this.atbs
        .map(e => this.compute(e))
        .reduce((e, acc) => (acc += e), 0);
      return 20 - totalInvested;
    },
    modifiers() {
      return this.atbs.reduce((acc, atb) => {
        acc[atb.short] = Number((atb.value / 2.1 - 5).toFixed(0));
        return acc;
      }, {});
    },
    totalArmorClass() {
      const armorClass = this.form.character.armorClass;
      return (
        10 +
        this.modifiers.des +
        parseInt(armorClass.armor) +
        parseInt(armorClass.shield) +
        parseInt(armorClass.others)
      );
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
