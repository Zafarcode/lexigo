import { LucideIcon } from "lucide-react";

export interface Tag {
  id: number;
  name: string;
}

export type FillInBlank = {
  id: number;
  type: "fillInBlank";
  question: string;
  correctAnswer: string;
  options: string[];
  viewed: boolean;
};

export type FinishQuiz = {
  id: number;
  type: "finishQuiz";
  en: string;
  uz: string;
  viewed: boolean;
};

export type WordPair = {
  type: "wordPair";
  id: number;
  value: string;
  pair: string;
  viewed: boolean;
};

export type ImageSelection = {
  type: "imageSelection";
  id: number;
  word: string;
  question: string;
  options: {
    id: string;
    image: string;
    label: string;
  }[];
  correct: string;
  viewed: boolean;
};

export type Flashcards = {
  type: "flashcard";
  id: number;
  front_side: string;
  back_side: string;
  description: string;
  synonyms: string[];
  tags: Tag;
  image: string;
  viewed: boolean;
};

export type Item =
  | FillInBlank
  | FinishQuiz
  | WordPair
  | ImageSelection
  | Flashcards;

export interface Unit {
  id: number;
  title: string;
  slug: string;
  type: "start" | "trophy" | "star" | "character" | "chest";
  isCompleted: boolean;
  isLocked: boolean;
  item: Item[]; // Updated to use the new `Item` type
}

export interface Section {
  id: number;
  title: string;
  theme: string;
  slug: string;
  units: Unit[]; // Contains an array of `Unit`
}

export type skillT = {
  name: string;
  slug: string;
  level: string[];
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  bgPattern: string;
};

export type levelTaskT = {
  id: number;
  slug: string;
  data: levelDataT[];
};

export type levelDataT = {
  title: string;
  description: string;
  slug: string
};

export interface Task {
  id: string;
  content: string;
}

export interface DraggableTaskProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  isSubmitted: boolean;
  isCorrect: boolean | null;
}

export interface ListetningTaskT {
  title?: string;
  instruction?: string;
  initialTasks?: Task[];
}


type SkillTaskT = {
  title: string;
  slug: string;
  description: string;
};

export type LevelT = {
  id: number;
  slug: string;
  data: SkillTaskT[];
};


export interface Message {
  sender: "person1" | "person2";
  content: string;
  time: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export type FinishQuizProps = {
  options: FinishQuiz[]
  onViewed: (itemId: number) => void
  slug: string
}

export interface KeyboardProps {
  clickedLetters: { [key: string]: boolean };
  currentWord: string;
  inputSpaces: string[];
  handleLetterClick: (letter: string) => void;
  handleNormalSpeech: (event: React.MouseEvent<HTMLButtonElement>, word: string) => void;
  alwaysDisabled?: boolean;
  statusSpeech: string;
}