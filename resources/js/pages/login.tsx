import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SVG from 'react-inlinesvg';

export default function LoginPage() {
    const handleSocialLogin = (e: React.MouseEvent<HTMLSpanElement>, method: string, url: string) => {
        e.preventDefault();
        window.location.href = url;
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50">
            <Card className="w-full max-w-md bg-white p-8 shadow-none">
                <CardContent>
                    <div className="mb-6 flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-black">Log in to your account</h1>
                    </div>

                    <div className="my-6">
                        {/* <Separator /> */}
                        <div className="relative mt-[-12px] flex justify-center text-xs uppercase">
                            <span className="px-2 text-muted-foreground">CONTINUE WITH</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="relative flex items-center">
                            <Button
                                variant="outline"
                                className="flex w-full items-center justify-center bg-white text-black"
                                onClick={(e) => handleSocialLogin(e, 'Google', '/auth/google/redirect')}
                            >
                                <span className="mr-2">
                                    <SVG src="/images/svg/google.svg" className="mr-2 size-6" />
                                </span>
                                Login with Google
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        By clicking continue, you agree to our{' '}
                        <a href="/terms" className="underline">
                            Terms of Service
                        </a>
                        and
                        <a href="/privacy" className="underline">
                            Privacy Policy
                        </a>
                        .
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
