import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import RoomCode from "../components/RoomCode";
import { useNavigate, useParams } from "react-router-dom";
import deleteImg from "../assets/images/delete.svg";

import "../styles/room.scss";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const navigate = useNavigate();
  const { title, questions } = useRoom(params.id!);

  async function handleEndRoom() {
    database.ref(`rooms/${params.id}`).update({
      endedAt: new Date(),
    });

    navigate("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={params.id!} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="roomTitle">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="questionList">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
