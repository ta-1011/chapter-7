import { useState, type FormEvent } from "react";
import { API_BASE_URL } from "../../constants";
import Input from "../../components/ui/Input";
import ErrorMessage from "../../components/ui/ErrorMessage";
import TextArea from "../../components/ui/TextArea";

const Contact = () => {
  // 入力テキストの表示
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //エラーメッセージの表示;
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [messageErrorMessage, setMessageErrorMessage] = useState("");

  // 送信中の処理
  const [isSubmit, setIsSubmit] = useState(false);

  // バリデーションの定義
  const valid = () => {
    let isValid = true;
    let nameError = "";
    let emailError = "";
    let messageError = "";

    if (!name) {
      nameError = "お名前を入力してください。";
      isValid = false;
    } else if (name.length > 30) {
      nameError = "30字以内で入力してください。";
      isValid = false;
    }

    if (!email) {
      emailError = "メールアドレスを入力してください。";
      isValid = false;
    } else if (!email.match(/.+@.+\..+/)) {
      emailError = "正しいメールアドレスを入力してください。";
      isValid = false;
    }

    if (!message) {
      messageError = "本文は必須です";
      isValid = false;
    }

    setNameErrorMessage(nameError);
    setEmailErrorMessage(emailError);
    setMessageErrorMessage(messageError);

    return isValid;
  };

  // 送信の処理

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!valid()) return;

    setIsSubmit(true);

    try {
      await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      alert("送信しました。");
      handleClear();
    } catch (error) {
      alert("送信に失敗しました。");
    } finally {
      setIsSubmit(false);
    }
  };

  // 送信後のフォームのクリア

  const handleClear = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-200 mx-auto py-10">
      <h1>お問い合わせフォーム</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mt-8 w-full flex justify-between">
          <label htmlFor="" className="w-60">
            お名前
          </label>
          <div className="w-full">
            <Input
              type="text"
              value={name}
              id="name"
              onChange={(value: string) => setName(value)}
            />
            <ErrorMessage message={nameErrorMessage} />
          </div>
        </div>
        <div className="mt-8 w-full flex justify-between">
          <label htmlFor="" className="w-60">
            メールアドレス
          </label>
          <div className="w-full">
            <Input
              type="email"
              value={email}
              id="email"
              onChange={(value: string) => setEmail(value)}
            />
            <ErrorMessage message={emailErrorMessage} />
          </div>
        </div>
        <div className="mt-8 w-full flex justify-between">
          <label htmlFor="" className="w-60">
            お問い合わせ内容
          </label>
          <div className="w-full">
            <TextArea
              type="text"
              value={message}
              id="message"
              onChange={(value: string) => setMessage(value)}
            />
            <ErrorMessage message={messageErrorMessage} />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button type="submit" className="mr-4" disabled={isSubmit}>
            送信
          </button>
          <button type="button" onClick={handleClear} disabled={isSubmit}>
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
