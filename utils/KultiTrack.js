const KultiTrack = (nameSpace) => {
  const baseNameSpace = `KultiTrack:${nameSpace}`;

  return {
    debug: (msg, obj) => {
      console.log(`${baseNameSpace}:debug:${msg}`, obj);
    },
    error: (msg, obj) => {
      console.error(`${baseNameSpace}:error:${msg}`, obj);
    }
  }
}
module.exports = KultiTrack;
