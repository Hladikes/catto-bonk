import cattoLeft1 from '../assets/images/catto-1-l.png'
import cattoRight1 from '../assets/images/catto-1-r.png'
import cattoLeft2 from '../assets/images/catto-2-l.png'
import cattoRight2 from '../assets/images/catto-2-r.png'
import cattoLeft3 from '../assets/images/catto-3-l.png'
import cattoRight3 from '../assets/images/catto-3-r.png'
import cattoLeft4 from '../assets/images/catto-4-l.png'
import cattoRight4 from '../assets/images/catto-4-r.png'

export {
  cattoLeft1,
  cattoRight1,
  cattoLeft2,
  cattoRight2,
  cattoLeft3,
  cattoRight3,
  cattoLeft4,
  cattoRight4
}

export const getCattoImage = (index: number, left: boolean) => {
  return new URL(`../assets/images/catto-${index + 1}-${left ? 'l' : 'r'}.png`, import.meta.url).href
}