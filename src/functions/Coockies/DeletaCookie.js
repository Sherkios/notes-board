import setCookie from "@/functions/Coockies/SetCookie";

export default function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}