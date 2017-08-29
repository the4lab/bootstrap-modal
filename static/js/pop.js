/*
 * 基于bootstrap弹出框，支持成功、警告、失败和普通弹出框
*/

/* 
 * Pop constructor
 * @param {jquery} $modal
*/

(function() {
	function Pop( $modal ) {
		if( !$modal || !$modal.jquery ) {
			throw new Error( 'please ensure input an effective parameter!' );
		}
		this.modal = $modal; //弹框jquerydom
		this.ok    = this.modal.find( '.pop-footer .ok' ); //确定按钮
		this.cancel= this.modal.find( '.pop-footer .cancel' ); //取消按钮
		this._init(); //初始化
		this.isShow = false; //弹出框是否显示
		this.hiddenCb = null; //弹框隐藏后的回调函数
	}

	Pop.prototype._init = function( msg ) {
		this.modal.addClass( 'pop' );
		this.modal.find( '.modal-header' ).addClass( 'pop-header' ); //为弹框的header添加pop-header类
		this.modal.find( '.modal-footer' ).addClass( 'pop-footer' ); //为弹框的footer添加pop-footer类
		this.modal.find( '.modal-body' ).addClass( 'pop-body' )
				  .html( '<i class=""></i>' +
						 '<p class="pop-text">' + msg + '</p>' ); //在弹框的中间内容区域添加i标签和p标签

		//窗口隐藏时自动注销确定按钮绑定的事件
		this.modal.on( 'hidden.bs.modal', function () {
	 		this.modal.find( '.pop-footer .ok' ).off();
	 		this.modal.find( '.pop-footer .cancel' ).off('click.pop-cancel');
	 		this.isShow = false;

	 		//如果不这样写无法执行隐藏弹窗后再次打开弹框，this.modal.modal('hide')失效
	 		//没有找到原因
	 		setTimeout(function() {
	 			this.hiddenCb && this.hiddenCb();
	 		}.bind(this), 0);
		}.bind( this ));
	}
	/**
	 * 
	**/
	Pop.prototype.sure = function( msg ) {
		this._show( 'sure', msg );
	}
	Pop.prototype.normal = function( msg ) {
		this._show( 'normal', msg );
	}
	Pop.prototype.success = function( msg ) {
		this._show( 'success', msg );
	}
	Pop.prototype.warning = function( msg ) {
		this._show( 'warning', msg );
	}
	Pop.prototype.error = function( msg ) {
		this._show( 'error', msg );
	}
	Pop.prototype.hide = function( callback ) {
		// this.modal.on( 'hidden.bs.modal.tmp', function () {
		// 	this.modal.off( 'hidden.bs.modal.tmp' );
	 // 		callback && callback();
		// }.bind( this ));
		this.hiddenCb = callback;
		
		this.modal.modal( 'hide' );
	}
	//绑定事件
	Pop.prototype.on = function( selecter, type, fun ) {
		this.modal.find( selecter ).on( type, fun );
	}
	Pop.prototype._show = function( type, msg ) {
		var that = this,
			$ok = this.modal.find( '.pop-footer .ok' ),
			$cancel = this.modal.find( '.pop-footer .cancel' );
			
		this.isShow = true;
		$ok.show();
		$cancel.show();

		switch ( type ) {
			case 'sure':
				this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-question-circle' );
				this.modal.find( '.modal-title' ).text( '确认' );
				break;
			case 'normal':
				$cancel.hide();
				$ok.click( function() {
					that.hide();
				} );
				this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-info-circle' );
				this.modal.find( '.modal-title' ).text( '提示' );
				break;
			case 'success':
				$cancel.hide();
				$ok.click( function() {
					that.hide();
				} );
				this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-check-circle' );
				this.modal.find( '.modal-title' ).text( '成功' );
				break;
			case 'warning':
				this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-exclamation-circle' );
				this.modal.find( '.modal-title' ).text( '警告' );
				break;
			case 'error':
				$cancel.hide();
				$ok.click( function() {
					that.hide();
				} );

				this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-times-circle' );
				this.modal.find( '.modal-title' ).text( '错误' );
				break;
			case 'folder':
				this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-info-circle' );
				this.modal.find( '.modal-title' ).text( '新建文件夹' );
				break;
			default:
				break;
		}
		this.modal.find( '.modal-title' ).addClass( 'pop-title' );

		this._emptyAddClass();
		this.modal.addClass( 'pop-' + type );
		this._setContent( type, msg );
		this.modal.modal( 'show' );
	}
	Pop.prototype._emptyAddClass = function( msg ) {
		this.modal.removeClass( 'pop-success pop-warning pop-error' );
	}
	Pop.prototype._setContent = function( type, msg ) {
		this.modal.find( '.pop-body .pop-text' ).html( msg || '操作失败!' );
	}
 	window.Pop = Pop;
})();