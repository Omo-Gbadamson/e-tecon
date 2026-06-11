import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { SignupInput, LoginInput } from '../validation'

export const authService = {
  async signup(data: SignupInput) {
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      // Store user data in Firestore
      const userRef = doc(db, 'users', userCredential.user.uid)
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        profileComplete: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      return userCredential.user
    } catch (error) {
      throw error
    }
  },

  async login(data: LoginInput) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      return userCredential.user
    } catch (error) {
      throw error
    }
  },

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw error
    }
  },

  async confirmReset(code: string, password: string) {
    try {
      await confirmPasswordReset(auth, code, password)
    } catch (error) {
      throw error
    }
  },

  async getUserData(uid: string) {
    try {
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)
      return userSnap.exists() ? userSnap.data() : null
    } catch (error) {
      throw error
    }
  },
}
