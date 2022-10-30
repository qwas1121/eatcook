export const QuestionData = [
  {
    id: 1,
    title: "쌀 vs 밀가루",
    answera: "쌀",
    answerb: "밀가루",
    answerc: null,
    subquestion: null,
    isOn: false,
  },
  {
    id: 2,
    title: "",
    answera: "점심",
    answerb: "저녁",
    answerc: null,
    subquestion: null,
    isOn: false,
  },

  {
    id: 3,
    title: "",
    answera: "해물",
    answerb: "육류",
    answerc: "채소",
    isOn: true,

    subquestion: [
      {
        id: 30,
        subname: "해물",
        answer1: "새우",
        answer2: "오징어",
        isOn: false,
      },

      {
        id: 31,
        subname: "육류",
        answer1: "소",
        answer2: "돼지",
        answer3: "닭",
        isOn: false,
      },
    ],

    //answerb_a: "돼지",
    //answerb_b: "소",
    //answerb_c: "닭",
  },
  {
    id: 5,
    title: "",
    answera: "볶음",
    answerb: "국물",
    answerc: "둘다별로",
    subquestion: null,
  },
];
