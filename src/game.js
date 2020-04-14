const defaultoptions = {
    rows: 6, columns: 6
}

export class HitTheCircle {
    $scoreBoard = null;
    options = {};
    score = 0;
    currentActiveButtonId = '';
    isRunning = false;

    constructor($container, options = {}) {
        this.$container = $container;
        this.options = { ...defaultoptions, ...options };
        $container.append(this._generateGameUI());
        $container.on('click', '.hitButton', this._onItemClick);
    }

    _generateGameUI() {
        const $container = $('<div />').addClass('container-sm');
        return $container.append(this._generateTitle(), this._generateScoreBoardUI(), this._generatePlayArea(), this._generateControls());
    }

    _generateTitle() {
        const $name = $('<h4 />').addClass('header').text('Hit The Circle');
        const $subHeader = $('<h6 />').addClass('subHeader').text('Test your skill how many circles can you hit?');
        return $('<div />').addClass('container headerContainer').append($name, $subHeader);
    }

    _generateScoreBoardUI() {
        this.$scoreBoard = $('<input />').addClass('scoreBoard form-control').attr('placeholder', 'Score');
        return $('<div />').addClass('container scoreBoardContainer').append($('<span />').addClass('label').text('Score'), this.$scoreBoard);;
    }

    _generatePlayArea() {
        const { rows, columns } = this.options;
        const $container = $('<div />').addClass('playArea').addClass('container');
        for (let i = 0; i < rows; i++) {
            const $row = $('<div />').addClass('row');
            for (let j = 0; j < columns; j++) {
                const id = `${i}_${j}`;
                const $circle = $('<input />').addClass('hitButton').attr({ type: 'radio', name: 'hitButton', id }).prop('disabled', true).val(`id`);
                $row.append($('<div />').addClass('col-sm').append($circle));
            }
            $container.append($row);
        }
        return $container;
    }

    _generateControls() {
        this.$playButton = $('<input />').attr({ type: 'button' }).addClass('btn btn-primary').val('Play');
        this.$stopButton = $('<input />').attr({ type: 'button', disabled: true }).addClass('btn btn-secondary').val('Stop');
        this.$playButton.on('click', this._onPlayClick);
        this.$stopButton.on('click', this._onStopClick);
        return $('<div />').addClass('container buttonContainer').append(this.$playButton, this.$stopButton);
    }

    _onPlayClick = () => {
        this.$playButton.prop('disabled', true);
        this.$stopButton.prop('disabled', false);
        this.$scoreBoard.val(0);
        this.$container.find('.hitButton').prop('disabled', false);
        this.score = 0;
        this._begin();
    }

    _onStopClick = () => {
        this.$playButton.prop('disabled', false);
        this.$stopButton.prop('disabled', true);
        this.$container.find('.hitButton:checked').prop('checked', false);
        this.$container.find('.hitButton').prop('disabled', true);
        this.currentActiveButtonId = '';
        this.isRunning = false;
    }

    _begin() {
        this.isRunning = true;
        this._pickRandomItem();
    }

    _pickRandomItem() {
        const { rows, columns } = this.options;
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * columns);
        const id = `${r}_${c}`;
        this.currentActiveButtonId = id;
        this.$container.find(`#${id}`).prop('checked', true);
    }

    _onItemClick = (ev) => {
        if (!this.isRunning) { return; }
        const $item = $(ev.currentTarget);
        const id = $item.attr('id');
        this.score += (id === this.currentActiveButtonId ? 1 : -1);
        this.$scoreBoard.val(this.score);
        this._pickRandomItem();
    }
}