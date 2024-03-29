export interface Theme {
  backgroundImage: string
  boxColor: string
  boxBlur: string
  textColor: string
  alignText: "left" | "center" | "right"
}

export interface Branch {
  title: string
  links?: { [name: string]: Branch }
  url?: string
}

export interface Root {
  theme: Theme
  title: string
  links: { [name: string]: Branch }
}
