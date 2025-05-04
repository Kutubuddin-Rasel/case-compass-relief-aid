
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-healing-600 to-support-600 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl -z-10"></div>
        <div className="absolute inset-0 bg-white rounded-lg shadow-xl"></div>
        
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-healing-700">Case Compass</h1>
            <p className="text-gray-600 mt-2">Create Your Account</p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
