export const state = () => ({
  hentais: []
});

export const mutations = {
  push(state, hentai) {
    state.hentais = state.hentais.filter(
      ({ id, chapter }) => id !== hentai.id && +chapter !== +hentai.chapter
    );

    state.hentais.push(hentai);
  }
};