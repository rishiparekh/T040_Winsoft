export const SERVER_URL="http://localhost:3001";

export const encrypted = "Cnwvtus KuaiTaa rlodeeurethn  an Ia_mrhs baer oag ndC_a aeoat dLj lLdio_me  p  hagZLngan _"

export const map = {
    "Khardung La": {
        coordinates: [0, 10],
        enemy: true,
        neighbours: ["Lachulung La", "Gyong La"]
    },
    "Lachulung La": {
        coordinates: [10, 20],
        enemy: false,
        neighbours: ["Lachulung La", "Sia La"]
    },
    "Sasser Pass": {
        coordinates: [10, 10],
        enemy: false,
        neighbours: ["Khardung La", "Sia La", "Zoji La"]
    },
    "Gyong La": {
        coordinates: [10, 0],
        enemy: false,
        neighbours: ["Khardung La", "Zoji La", "Indira Col"]
    },
    "Sia La": {
        coordinates: [20, 20],
        enemy: false,
        neighbours: ["Sasser Pass", "Rezang La"]
    },
    "Zoji La": {
        coordinates: [20, 10],
        enemy: true,
        neighbours: ["Sasser Pass", "Gyong La"]
    },
    "Indira Col": {
        coordinates: [20, 0],
        enemy: true,
        neighbours: ["Gyong La", "Rezang La"]
    },
    "Rezang La": {
        coordinates: [30, 10],
        enemy: false,
        neighbours: ["Sia La", "Indira Col", "Tanglang La", "Pensi La"]
    },
    "Tanglang La": {
        coordinates: [40, 20],
        enemy: true,
        neighbours: ["Tanglang La", "Marsimik La"]
    },
    "Pensi La": {
        coordinates: [40, 0],
        enemy: false,
        neighbours: ["Rezang La", "Marsimik La"]
    },
    "Marsimik La": {
        coordinates: [50, 10],
        enemy: false,
        neighbours: ["Tanglang La", "Pensi La"]
    }
  }