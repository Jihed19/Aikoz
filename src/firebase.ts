// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCJDRQk60iuB0Xz3YIpt1MnAY6kATzkcJw",
  authDomain: "aikoz-b44be.firebaseapp.com",
  projectId: "aikoz-b44be",
  storageBucket: "aikoz-b44be.firebasestorage.app",
  messagingSenderId: "880697882130",
  appId: "1:880697882130:web:915a2eda672266045bcacb",
  measurementId: "G-5546E1BR44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
export const analyticsPromise = typeof window !== 'undefined'
  ? isSupported().then((supported) => (supported ? getAnalytics(app) : null)).catch(() => null)
  : Promise.resolve(null);

// Initialize Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Translates Firebase Auth error codes to user-friendly Spanish messages
export function getFirebaseAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'El formato del correo electrónico no es válido.';
    case 'auth/user-disabled':
      return 'Esta cuenta de usuario ha sido inhabilitada.';
    case 'auth/user-not-found':
      return 'No existe una cuenta registrada con este correo.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos. Verifica tus datos e intenta de nuevo.';
    case 'auth/email-already-in-use':
      return 'Este correo electrónico ya está registrado. Prueba iniciando sesión.';
    case 'auth/operation-not-allowed':
      return 'Este método de acceso aún no está habilitado en Firebase console.';
    case 'auth/weak-password':
      return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
    case 'auth/popup-closed-by-user':
      return 'Se cerró la ventana de inicio de sesión de Google antes de finalizar.';
    case 'auth/cancelled-popup-request':
      return 'Operación cancelada debido a una nueva solicitud.';
    case 'auth/popup-blocked':
      return 'El navegador bloqueó la ventana emergente de Google. Habilita los pop-ups para continuar.';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu conexión a internet.';
    case 'auth/unauthorized-domain':
      return 'El dominio actual no está en la lista de dominios autorizados de Firebase Authentication para el proyecto aikoz-b44be. Puedes agregarlo en Firebase Console o usar el acceso por Correo Electrónico.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Por tu seguridad, espera unos minutos e intenta de nuevo.';
    default:
      return 'Ocurrió un error inesperado al procesar la autenticación.';
  }
}


export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection to Firestore
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase Firestore is currently offline or unreachable.");
      return false;
    }
    // Any permission or missing doc response still confirms network connection to Firestore
    return true;
  }
}
