import { Button } from "@/components/ui/button";
import React from "react";

const SignUpCTA = () => {
  return (
    <div className="bg-signUpCta bg-center py-48">
      <div className="flex-column-center bg-primary-500/75   py-24 backdrop-blur-sm">
        <h2 className="h1-bold text-7xl">Join a world of Reading</h2>
        <p className="body-medium py-2 text-white">
          Malesuada ut aliquam at ac est nisi, interdum etiam dignissim. Risus
          elit et fringilla habitant ut facilisi.
        </p>
        <Button className="my-4 rounded-full bg-white font-bold  text-primary-500">
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

export default SignUpCTA;
