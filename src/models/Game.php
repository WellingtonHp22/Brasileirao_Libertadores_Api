class Game {
    private $homeTeam;
    private $awayTeam;
    private $date;
    private $time;
    private $stadium;

    public function __construct($homeTeam, $awayTeam, $date, $time, $stadium) {
        $this->homeTeam = $homeTeam;
        $this->awayTeam = $awayTeam;
        $this->date = $date;
        $this->time = $time;
        $this->stadium = $stadium;
    }

    public function getHomeTeam() {
        return $this->homeTeam;
    }

    public function getAwayTeam() {
        return $this->awayTeam;
    }

    public function getDate() {
        return $this->date;
    }

    public function getTime() {
        return $this->time;
    }

    public function getStadium() {
        return $this->stadium;
    }

    public function formatGameInfo() {
        return "{$this->homeTeam} vs {$this->awayTeam} - {$this->date} {$this->time} at {$this->stadium}";
    }
}