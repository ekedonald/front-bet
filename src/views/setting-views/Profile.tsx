import { Avatar, Button } from "@/components/Elements";
import { Input } from "@/components/Form";
import { useDocumentTitle } from "@/hooks";
import { useAuth } from "@/libs/auth";
import { ChangeEvent, useState } from "react";
import { useChangeProfilePhoto } from "./api";

interface ProfilePropType {
  title: string;
}

const Profile = ({ title }: ProfilePropType) => {
  useDocumentTitle(title);

  const changeProfilePhotoMutation = useChangeProfilePhoto();
  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar || '');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select an image file.');
        return;
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
        setErrorMessage('File size must be less than 2MB.');
        return;
      }
      setErrorMessage(null);

      const formData = new FormData();
      formData.append('file', file);
      try {
        changeProfilePhotoMutation.mutate(formData, {
          onSuccess: (data) => {
            console.log(data);
            setAvatarUrl(data);
            setErrorMessage(null);
          },
        });
      } catch (error) {
        setErrorMessage('Error uploading file. Please try again.');
      }
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="grid lg:grid-cols-3">
        <div className="profile-photo-text p-5">
          <h4 className="font-semibold text-xl">Profile Photo</h4>
          <h4 className="font-lighter text-sm mt-3">This image will be displayed on your profile</h4>
          <label className="btn btn-sm bg-gray-400 dark:bg-bgDark-400 text-white border-gray-400 cursor-pointer mt-4">
            Select Photo
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}  
            />
          </label>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
        <Avatar
          variant="rounded"
          size="xl"
          name={`${user?.first_name} ${user?.last_name}`}
          src={avatarUrl}
        />
      </div>
      <hr className="my-10 dark:border-bgDark-500" />
      <div className="grid lg:grid-cols-4 p-5">
        <div className="profile-photo-text col-span-1">
          <h4 className="font-semibold text-xl">Personal Information</h4>
          <h4 className="font-lighter text-sm mt-3">Update your personal details here.</h4>
        </div>
        <div className="profile-photo-text col-span-2 mt-10 lg:mt-0">
          <div className="grid lg:grid-cols-2 gap-5">
            <Input 
              placeholder={user?.first_name}
              disabled={true}
              label="First Name"
            />
            <Input 
              placeholder={user?.last_name}
              disabled={true}
              label="Last Name"
            />
          </div>
          <div className="mt-5">
            <Input 
              placeholder={user?.email}
              disabled={true}
              label="Email"
            />
          </div>
          <Button
            disabled={true}
            className="mt-5"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
